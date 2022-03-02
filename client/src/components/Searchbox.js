import React, {useState} from 'react';
import { Button, Box, TextField, NativeSelect, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

// search for characters by name
import {getRaceInfo, getClassInfo} from '../utils/API';

const Searchbox = () => {
	const [showModal, setShowModal] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searched, setSearched] = useState({});
  const [searchType, setSearchType] = useState("race");

	const handleSearchType = (event) => {
		const { name, value } = event.target;
		setSearchType({ ...searchType, [name]: value });
	};
		// create method to search for races or classes and set state on form submit
		const handleFormSubmit = async (event) => {
			event.preventDefault();

			if (!searchInput) {
				return false;
			}
			const form = event.currentTarget;
			event.stopPropagation();
			try {
				if(searchType === 'race'){
				const response = await getRaceInfo(searchInput);

				const race = await response;

				const raceData = {
					name: race.name,
					speed: race.speed,
					age: race.age,
					size: race.size_description,
					startingProf: race.starting_proficiencies.name,
					languages: race.language_desc,
					traits: race.traits,
					subraces: race.subraces.name,
				};

				setSearched(raceData);
				setSearchInput("");
				setShowModal(true);
			}else{
				const response = await getClassInfo(searchInput);

				const charClass = await response;

				const classData = {
					name: charClass.name,
					hitDie: charClass.hit_die,
				};
				setSearched(classData);
				setSearchInput("");
				setShowModal(true);
			}
			} catch (err) {
				console.error(err);
			}
		};
  
  return (
		<>
		<Box sx={{display:'flex-column'}}>
			<NativeSelect defaultValue= {"Select"} 
				sx={{width: '100%'}}
				onChange={handleSearchType}>
					<option value={"race"}>race</option>
					<option value={"class"}>class</option>
			</NativeSelect>
			<TextField
				id="search"
				label="Search for class or race"
				name="searchInput"
				type="search"
				value={searchInput}
				onChange={(e) => setSearchInput(e.target.value)}
				variant="standard"
				sx={{width: '100%'}}
			/>
			<Button
				type="submit"
				variant="success"
				size="lg"
				onClick={handleFormSubmit}
			>Submit Search
			</Button>
			{searchType === "race" ? (
			<Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
				sx={{ overflow: "hidden"}}
      >
				<DialogTitle>
					Results:
				</DialogTitle>
					<DialogContent sx={{overflow: "scroll"}}>
					<Typography>
					Name: {searched.name}
					</Typography>
					<Typography>
					Speed: {searched.speed}
					</Typography>
					<Typography>
					Age Descripton: {searched.age}
					</Typography>
					<Typography>
					Size Description: {searched.size}
					</Typography>
					<Typography>
					Starting Proficiencies: {searched.startingProf}
					</Typography>
					<Typography>
					{searched.starting_proficiencies}
					</Typography>
					<Typography>
					Languages: {searched.languages}
					</Typography>
					<Typography>
					Subraces: {searched.subraces}
					</Typography>
				</DialogContent>
				
			</Dialog>
			):(
				<Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
				sx={{ overflow: "hidden"}}
      >
				<DialogTitle>
					Results:
				</DialogTitle>
				<DialogContent sx={{overflow: "scroll"}}>
					<Typography>
					Name: {searched.name}
					</Typography>
					<Typography>
					Hit Die: d{searched.hitDie}
					</Typography>
				</DialogContent>
			</Dialog>
			)}
		</Box> 
		</>
	);
}

export default Searchbox;
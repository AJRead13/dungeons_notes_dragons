import React, {useState} from 'react';
import {QUERY_RACE} from '../utils/queries';
import { Button, Container, Box, TextField, NativeSelect } from "@mui/material";
import Auth from '../utils/auth';

// search for characters by name
import {getRaceInfo, getClassInfo} from '../utils/API';

const Searchbox = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searched, setSearched] = useState([]);
    const [searchType, setSearchType] = useState("");

//   const [raceInfo, getRaceInfo] = useQuery(QUERY_RACE);
		// const [saveBook, { error }] = useMutation();
		// set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
		// learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
		
		// create method to search for races or classes and set state on form submit
		const handleFormSubmit = async (event) => {
			event.preventDefault();

			if (!searchInput) {
				return false;
			}
			const form = event.currentTarget;
			event.stopPropagation();
			try {
				if(searchType.value === 'race'){
				const response = await getRaceInfo(searchInput);

				if (!response.ok) {
					throw new Error("something went wrong!");
				}

				const { races } = await response.json();

				const raceData = races.map((race) => ({
					name: race.name,
					speed: race.speed,
					abilityBonusName: race.abiility_bonuses.ability_score.name,
					abilityBonus: race.abiility_bonuses.bonus,
					age: race.age,
					size: race.size_description,
					startingProf: race.starting_proficiencies.name,
					languages: race.language_desc,
					traits: race.traits,
					subraces: race.subraces.name,
				}));

				setSearched(raceData);
				setSearchInput("");
			}else{

				const response = await getClassInfo(searchInput);

				if (!response.ok) {
					throw new Error("something went wrong!");
				}

				const { charClasses } = await response.json();

				const classData = charClasses.map((charClass) => ({
					name: charClass.name,
					hitDie: charClass.hit_die,
					profSkills: charClass.proficiency_choices.from.name,
					prof: charClass.proficiencies.name,
					savingThrows: charClass.saving_throws.name,
					startingEquip: charClass.starting_equipment.equipment.name,
					startingEquipChoice: charClass.starting_equipment.from,
					classLevels: charClass.multi_classing,
					subClass: charClass.subclasses.name,
					spellcasting: charClass.spellcasting_ability.name,
				}));

				setSearched(classData);
				setSearchInput("");
			}
			} catch (err) {
				console.error(err);
			}
		};
  
  return (
		<>
		<Box sx={{display:'block'}}>
			{/* <h4>Search for {searchType}!</h4> */}
			<NativeSelect defaultValue= {"Select"} 
				// inputProps:{{
				// name: searchType
				sx={{width: '100%'}}
				// }}
				onChange={(e) => setSearchType(e.target.value)}>
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
		</Box>
		{/* <Container>
			{/* <h5>
				{searched.length
					? `Viewing ${searched.length} results:`
					: "Search for a race/class to begin"}
			</h5> */}
			{/* <div>
				{searched.map((search) => {
					return (
					<h2>${search.name}</h2>
					)}

				)}
			</div> */}
		{/* </Container> */} 
		</>
	);
}

export default Searchbox;
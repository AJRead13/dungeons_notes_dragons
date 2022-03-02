import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { QUERY_CHARACTERS } from "../utils/queries";
import { List, ListItemButton, Card, CardContent, Dialog, Button, DialogTitle } from '@mui/material';
import CharCreate from '../components/CharCreate';
import Auth from '../utils/auth';
import Typography from '@mui/material/Typography';


const Home = () => {
	const [showModal, setShowModal] = useState(false);
	const { loading, data, error } = useQuery(QUERY_CHARACTERS, {
		fetchPolicy: "no-cache",
	});

	const characterList = data?.characters || [];

	if(error){
		console.log(JSON.parse(JSON.stringify(error)));
	}
	const handleAlert = () => {
		return (
			<Dialog open={showModal}
			onClose={() => setShowModal(false)}>
				<DialogTitle>You must be logged in!</DialogTitle>
			</Dialog>
		);
	}

	return (
		<Card variant="outlined" sx={{}}>
			<CardContent>
			<Typography variant="h2" sx={{textAlign: "center", color: "black", backgroundColor: "#f03612", maxWidth: {xs: "maxWidthXs", md: "maxWidthMd"}}}>
				Welcome to Dungeon, Notes, Dragons
			</Typography>
			<Typography variant="h3" style={{ textAlign: "center", maxWidth: {xs: "maxWidthXs", md: "maxWidthMd"}}} >
				Here are some User's Characters:
				{loading ? (
					<Typography>
						Retrieving lost adventurers...
					</Typography>
				) : (
					<List className="square">
						{characterList.map((character) => {
							return (
								<Card style={{ textAlign: "center" }} key={character._id}>
									<CardContent sx={{ textAlign: "center", justifyContent: "center" }}>
								<ListItemButton key={character._id}>
									{Auth.loggedIn() ? (
									<Link sx={{textAlign: "center", underline: "hover", color: "black"}}to={{ pathname: `/character/${character._id}` }}>
										{character.characterName}
									</Link>
									) : (
										<div>
										<Button onClick={() => {setShowModal(true)}} to={{pathname: '/' }}>
										{character.characterName}
									</Button>
									<Dialog open={showModal}
									onClose={() => setShowModal(false)}>
										<DialogTitle>You must be logged in to view a Character Sheet!</DialogTitle>
									</Dialog>
									</div>
									)
									}
								</ListItemButton>
								</CardContent>
								</Card>
							);
						})}
					</List>
				)}
			</Typography>
			{Auth.loggedIn() ? (
      <CharCreate />
			) : (
			<Typography>
			</Typography>
			)}
			</CardContent>
		</Card>
	);
};
export default Home;
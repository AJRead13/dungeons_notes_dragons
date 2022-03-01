import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { Button, Dialog } from '@mui/material';
import { getRaceInfo, getClassInfo } from "../utils/API";

import CharSheet from '../components/CharSheet';
import Searchbox from '../components/Searchbox';
import CharCreate from '../components/CharCreate'


const Home = () => {
	const { loading, data, error } = useQuery(GET_ME, {
		fetchPolicy: "no-cache",
	});

	const characterList = data?.characters || [];
  const [showModal, setShowModal] = useState(false);

	if(error){
		console.log(JSON.parse(JSON.stringify(error)));
	}

	return (
		<div className="card bg-white card-rounded w-50">
			<div className="card-header bg-dark text-center">
				<h1>Welcome to The Dungeon, Notes, Dragons!</h1>
			</div>
			<div className="card-body m-5">
				<h2>Here is a list of user-created Characters:</h2>
				{loading ? (
					<div>Loading...</div>
				) : (
					<ul className="square">
						{characterList.map((character) => {
							return (
								<li key={character._id}>
									<Link to={{ pathname: `/character/${character._id}` }}>
										{character.character}
									</Link>
								</li>
							);
						})}
					</ul>
				)}
			</div>
      <CharCreate />
		</div>
	);
};
export default Home;
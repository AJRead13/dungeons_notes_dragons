import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { Alert, AlertTitle } from '@mui/material';
import { QUERY_SINGLE_CHARACTER } from "../utils/queries";
import { Link } from 'react-router-dom'
import CharSheet from '../components/CharSheet';
import Searchbox from '../components/Searchbox';


const CharSheetViewer = () => {
  const { characterId } = useParams();
  console.log(characterId)
  const { loading, data, error } = useQuery(QUERY_SINGLE_CHARACTER, {
    variables: {
      characterId: characterId
    },
		fetchPolicy: "no-cache",
	});
  const character = data?.character || {};
  return (
    <div>
      {error && (     
        <Alert severity="error" onClose={() => {}}>
          <AlertTitle>Error</AlertTitle>
          Something went wrong while loading the character.
        </Alert>
      )}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <CharSheet character={character} />
      )}
    </div>
  )
}

export default CharSheetViewer;
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Alert, AlertTitle } from '@mui/material';
import { QUERY_SINGLE_CHARACTER } from "../utils/queries";
import CharSheet from '../components/CharSheet';


const CharSheetViewer = () => {
  const { characterId } = useParams();
  
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
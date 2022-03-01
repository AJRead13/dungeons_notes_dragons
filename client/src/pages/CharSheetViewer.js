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
  const { id } = useParams();

  const { loading, data, error } = useQuery(QUERY_SINGLE_CHARACTER, {
    variables: {
      _id: id
    },
		fetchPolicy: "no-cache",
	});

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
        <CharSheet character={data} />
      )}
    </div>
  )
}

export default CharSheetViewer;
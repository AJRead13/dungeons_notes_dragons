import React from 'react';
import { Redirect, userParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom'
import CharSheet from '../components/CharSheet';
import Searchbox from '../components/Searchbox';


const CharSheetViewer = () => {
  return (
    <div>
      <form className="charSheet">
        <header>
          <section></section>
        </header>
      </form>
    </div>
  )
}

export default CharSheetViewer;
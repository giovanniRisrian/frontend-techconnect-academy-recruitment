import React from 'react'
import RouteNavigation from '../../../routes/RouteNavigation'
import ProgramFormBloc from './bloc/ProgramPostingBloc'
import ProgramForm from './component/ProgramForm'
import UseProgramForm from './component/UseProgramForm'
import ProgramService from './service/ProgramService'

const ProgramPosting = () => {
  return (
    <div><ProgramForm bloc={() =>ProgramFormBloc(UseProgramForm, ProgramService, RouteNavigation)}/></div>
  )
}

export default ProgramPosting
import React from 'react'
import RouteNavigation from '../../../routes/RouteNavigation'
import ApplicantListBloc from './bloc/ApplicantListBloc'
import UseApplicantList from './bloc/UseApplicantList'
import ApplicantListComp from './component/ApplicantListComp'
import ApplicantService from './service/ApplicantService'

const ApplicantList = () => {
  return (
    <div><ApplicantListComp bloc={() => ApplicantListBloc(UseApplicantList,ApplicantService,RouteNavigation)}/></div>
  )
}

export default ApplicantList
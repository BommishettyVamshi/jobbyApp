import {EMPLOYMENT_TYPES_LIST} from '../../utils/constants'

import '../SalaryRangeFilter/index.css'

const FilterCard = props => {
  const {employmentTypeList, changeEmploymentType} = props

  const onchangeEmploymentType = event => {
    const {value, checked} = event.target
    changeEmploymentType(value, checked)
  }

  return (
    <div className="filter-card">
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="filter-list-card">
        {EMPLOYMENT_TYPES_LIST.map(each => (
          <li className="input-card" key={each.employmentTypeId}>
            <input
              id={each.employmentTypeId}
              type="checkbox"
              value={each.employmentTypeId}
              onChange={onchangeEmploymentType}
              checked={employmentTypeList.includes(each.employmentTypeId)}
              className="input-field"
            />
            <label htmlFor={each.employmentTypeId} className="label-field">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FilterCard

import {SALARY_RANGES_LIST} from '../../utils/constants'

import './index.css'

const SalaryRangeFilter = props => {
  const {minimumPackage, changeSalaryRange} = props

  return (
    <div className="filter-card">
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filter-list-card">
        {SALARY_RANGES_LIST.map(each => (
          <li className="input-card" key={each.salaryRangeId}>
            <input
              id={`salary-${each.salaryRangeId}`}
              type="radio"
              value={each.salaryRangeId}
              checked={minimumPackage === each.salaryRangeId}
              className="input-field"
              onChange={() => changeSalaryRange(each.salaryRangeId)}
            />
            <label
              htmlFor={`salary-${each.salaryRangeId}`}
              className="label-field"
            >
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SalaryRangeFilter

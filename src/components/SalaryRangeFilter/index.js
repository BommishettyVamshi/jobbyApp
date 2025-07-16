import {Component} from 'react'

import {SALARY_RANGES_LIST} from '../../utils/constants'

import './index.css'

class SalaryRangeFilter extends Component {
  constructor(props) {
    super(props)
    const {minimumPackage} = props
    this.state = {
      minimumPackage,
    }
  }

  onChangesalaryRange = event => {
    const {changeSalaryRange} = this.props
    this.setState(
      {
        minimumPackage: event.target.value,
      },
      () => {
        const {minimumPackage} = this.state
        changeSalaryRange(minimumPackage)
      },
    )
  }

  render() {
    const {minimumPackage} = this.state

    return (
      <div className="filter-card">
        <h1 className="filter-heading">Salary Range</h1>
        <ul className="filter-list-card">
          {SALARY_RANGES_LIST.map(each => (
            <li className="input-card" key={each.salaryRangeId}>
              <input
                id={each.salaryRangeId}
                type="radio"
                value={each.salaryRangeId}
                onChange={this.onChangesalaryRange}
                checked={each.salaryRangeId === minimumPackage}
                className="input-field"
              />
              <label htmlFor={each.salaryRangeId} className="label-field">
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default SalaryRangeFilter

import {Component} from 'react'

import {EMPLOYMENT_TYPES_LIST} from '../../utils/constants'

import '../SalaryRangeFilter/index.css'

class FilterCard extends Component {
  constructor(props) {
    super(props)
    const {employmentTypeList} = props
    this.state = {
      employmentTypeList: employmentTypeList || [],
    }
  }

  onChangeEmploymentType = event => {
    const {value, checked} = event.target
    const {changeEmploymentType} = this.props
    this.setState(
      prevState => {
        const updatedEmployTypeList = checked
          ? [...prevState.employmentTypeList, value]
          : prevState.employmentTypeList.filter(each => each !== value)

        return {
          employmentTypeList: updatedEmployTypeList,
        }
      },
      () => {
        const {employmentTypeList} = this.state
        changeEmploymentType(employmentTypeList)
      },
    )
  }

  render() {
    const {employmentTypeList} = this.state

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
                onChange={this.onChangeEmploymentType}
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
}

export default FilterCard

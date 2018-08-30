import React, { Component } from 'react';

import { TableHeaderColumn, BootstrapTable } from 'react-bootstrap-table';

import data from '../../data.json';
import './Table.css';

import {
  urlFormatter,
  dateFormatter,
  repoFormatter,
  labelsFormatter,
  languageFormatter,
  titleFormatter
} from '../../utils.js';

export default class Table extends Component {
  constructor(props, context) {
    super(props, context);
    const equalityType = this.props.equalityType;
    this.state = {
      loading: true,
      data: data.Items,
      equalityType
    };
    this.clearFiltered = this.clearFiltered.bind(this);
  }

  componentDidUpdate() {
    const newEqaulityType = this.props.equalityType;
    const prevEqualityType = this.state.equalityType;
    if (newEqaulityType !== prevEqualityType) {
      this.clearFiltered();
      this.setState({ equalityType: newEqaulityType });
    }
  }

  clearFiltered() {
    this.refs.Title.cleanFiltered();
    this.refs.Repo.cleanFiltered();
    this.refs.Language.cleanFiltered();
    this.refs.Labels.cleanFiltered();
    this.refs.Time.cleanFiltered();
    this.refs.Url.cleanFiltered();
  }

  render() {
    return (
      <React.Fragment>
        <BootstrapTable
          ref="table"
          data={this.state.data}
          hover
          condensed
          pagination={true}
        >
          <TableHeaderColumn
            isKey={true}
            ref="Title"
            dataField="Title"
            dataFormat={titleFormatter}
          >
            Title
          </TableHeaderColumn>
          <TableHeaderColumn
            ref="Repo"
            dataField="Repo"
            filterFormatted={true}
            filter={{
              type: 'TextFilter',
              placeholder: 'Name of repo is...'
            }}
            dataFormat={repoFormatter}
          >
            Repo
          </TableHeaderColumn>
          <TableHeaderColumn
            ref="Language"
            dataField="Language"
            filterFormatted={true}
            filter={{
              type: 'TextFilter',
              placeholder: 'Language?',
              condition: this.state.equalityType
            }}
            dataFormat={languageFormatter}
          >
            Language
          </TableHeaderColumn>
          <TableHeaderColumn
            ref="Labels"
            dataField="Labels"
            filterFormatted={true}
            filter={{ type: 'TextFilter', placeholder: 'Label?' }}
            dataFormat={labelsFormatter}
          >
            Labels
          </TableHeaderColumn>
          <TableHeaderColumn
            ref="Time"
            dataField="Time"
            filterFormatted={true}
            dataFormat={dateFormatter}
            filter={{
              type: 'NumberFilter',
              delay: 1000,
              numberComparators: ['=', '>', '<=']
            }}
          >
            Days Old
          </TableHeaderColumn>
          <TableHeaderColumn
            ref="Url"
            dataField="Url"
            dataFormat={urlFormatter}
          >
            URL
          </TableHeaderColumn>
        </BootstrapTable>
      </React.Fragment>
    );
  }
}

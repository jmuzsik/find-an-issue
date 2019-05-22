import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, {
  Comparator,
  numberFilter,
  textFilter,
} from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {
  dateFormatter,
  labelsFormatter,
  languageFormatter,
  repoFormatter,
  titleFormatter,
urlFormatter,
} from '../../utils.js';
import DATA from '../../data.json';
import './Table.css';

const { EQ, GT, LE } = Comparator;

export default class Table extends Component {
  constructor(props, context) {
    super(props, context);
    const equalityType = this.props.equalityType;
    this.state = {
      loading: true,
      equalityType
    };
  }

  componentDidUpdate() {
    const newEqaulityType = this.props.equalityType;
    const prevEqualityType = this.state.equalityType;
    if (newEqaulityType !== prevEqualityType) {
      this.setState({ equalityType: newEqaulityType });
    }
  }

  getColumns = () => {
    const { equalityType } = this.state;

    return ([
      {
        dataField: 'Title',
        text: 'Title',
        formatter: titleFormatter,
      },
      {
        dataField: 'Repo',
        text: 'Repo',
        filter: textFilter({
          placeholder: 'Name of repo is...'
        }),
        filterValue: repoFormatter,
        formatter: repoFormatter,
      },
      {
        dataField: 'Language',
        text: 'Language',
        filter: textFilter({
          placeholder: 'Language?',
          comparator: Comparator.EQ,
          caseSensitive: equalityType,
        }),
        filterValue: languageFormatter,
        formatter: languageFormatter,
      },
      {
        dataField: 'Labels',
        text: 'Labels',
        filter: textFilter({
          placeholder: 'Label?'
        }),
        filterValue: labelsFormatter,
        formatter: labelsFormatter,
      },
      {
        dataField: 'Time',
        text: 'Days old',
        formatter: dateFormatter,
        filter: numberFilter({
          delay: 600,
          comparators: [EQ, GT, LE],
          placeholder: 'Days old?',
          withoutEmptyComparatorOption: true,
          withoutEmptyNumberOption: true,
          className: 'custom-numberfilter-class',
          numberClassName: 'custom-number-class',
          comparatorClassName: 'custom-comparator-class',
        }),
        filterValue: dateFormatter,
      },
      {
        dataField: 'Url',
        text: 'URL',
        formatter: urlFormatter,
      },
    ]);
  };

  render() {
    return (
      <BootstrapTable
        columns={this.getColumns()}
        condensed
        data={ DATA.Items }
        filter={ filterFactory() }
        hover
        id="next-table"
        keyField="Title"
        pagination={ paginationFactory({showTotal: true}) }
      />
    );
  }
}

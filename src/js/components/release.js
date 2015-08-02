var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');
var RepositoryStore = require('../stores/repository');
var Release = require('../components/release.js');
var _ = require('underscore');

var Release = React.createClass({
  mixins: [
    Reflux.connect(RepositoryStore, 'releases')
  ],

  getInitialState: function () {
    return {
      releases: []
    };
  },

  parseDate: function () {
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    var dateFormat = new Date(this.props.details.published_at);
    return dateFormat.getDate() + ' ' + monthNames[dateFormat.getMonth()];
  },

  render: function () {
    var count;

    if (!_.isEmpty(this.props.details.assets)) {
      count = (
        <h3 className='downloads'>
          {this.props.details.assets[0].download_count}
          <i className='fa fa-download' />
        </h3>
      );
    }

    return (
      <div className='release'>
        <div className='page-header'>
          <h3>{this.props.details.name}</h3>
          {this.props.details.prerelease ?
            <span className='label label-warning'>Prerelease</span> : null }
          <a href={this.props.details.html_url} target='_blank'>
            <i className='fa fa-external-link'></i>
          </a>
          {count}
        </div>
        <div className='row'>
          <div className='col-md-8'>
            <pre>
              {this.props.details.body ? this.props.details.body : 'No description available' }
            </pre>
          </div>

          <div className='col-md-4'>
            <dl className='dl-horizontal'>
              <dt><i className='fa fa-calendar-o' /></dt>
              <dd>{this.parseDate()}</dd>

              <dt><i className='fa fa-tag' /></dt>
              <dd>{this.props.details.tag_name}</dd>
            </dl>
          </div>

        </div>
      </div>
    );
  }
});

module.exports = Release;

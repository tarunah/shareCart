import React from 'react';

class ModuleLoader extends React.Component {
  constructor(props) {
    super(props);

    this.module = null;
    this.state = {
      loaded: false,
      error: false
    };
  }

  componentDidMount() {
    this.props
      .loader()
      .then(module => {
        this.module = module.default;
        this.setState({
          loaded: true
        });
      })
      .catch(e => {
        console.error('[ERROR] Failed to load module.', e);
        this.props.errorCallback && this.props.errorCallback();
        this.setState({
          error: true
        });
      });
  }

  render() {
    const {
      state: { loaded, error },
      props: { loading: Loading, moduleProps },
      module: Module
    } = this;

    return loaded ? <Module {...moduleProps} /> : <Loading error={error} />;
  }
}

export default function Loadable({ loader, loading, errorCallback }) {
  return props => (
    <ModuleLoader
      moduleProps={props}
      loader={loader}
      loading={loading}
      errorCallback={errorCallback}
    />
  );
}

import React from "react";
import { Route } from "react-router-dom";
import { connect } from 'react-redux'

import CollectionOverview from "../../components/collections-overview/collection-overview.component";
import CategoryPage from '../category/collection.component';

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';
import updateCollections from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component'


const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CategoryPage)

class ShopPage extends React.Component {

  state = {
    loading: true
  };

  unSubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props
    const collectionRef = firestore.collection('collections');

    this.unSubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
      const collectionMap = convertCollectionSnapshotToMap(snapshot);
      updateCollections(collectionMap);
      this.setState({loading: false})
    })
  }

  render() {
    const { match } = this.props
    const {loading} = this.state

    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props} />} />
        <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);

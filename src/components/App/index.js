import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.scss';

/* Pages */
/* Components */
import Home from 'components/Home';
// import Localisation from 'components/Localisation';
import Payment from 'components/Payment';
import Error404 from 'components/Error404';
import Footer from 'components/Footer';

/* Containers */
import Contact from 'containers/Contact';
import Register from 'containers/Register';
import Login from 'containers/Login';
import Profil from 'containers/Profil';
import ProfilUpdate from 'containers/ProfilUpdate';
import Beneficiary from 'containers/Beneficiary';
import BeneficiaryDetails from 'containers/Beneficiary/BeneficiaryDetails';
import Shopkeeper from 'containers/Shopkeeper';
import ShopkeeperDonation from 'containers/Shopkeeper/ShopkeeperDonation';
import AddProduct from 'containers/Shopkeeper/AddProduct';
import EditProduct from 'containers/Shopkeeper/EditProduct';
import Donations from 'containers/Donation';

const App = () => (
  <>
    <Switch>
      <Route
        exact
        key="/"
        path="/"
        render={() => {
          return <Home />;
        }}
      />
      <Route
        exact
        key="/contact"
        path="/contact"
        render={() => {
          return <Contact />;
        }}
      />
      <Route
        exact
        key="/login"
        path="/login"
        render={() => {
          return <Login />;
        }}
      />
      <Route
        exact
        key="/register"
        path="/register/:role(donor|beneficiary|shopkeeper)"
        component={Register}
      />
      <Route
        exact
        key="/profil"
        path="/profil"
        render={() => {
          return <Profil />;
        }}
      />
      <Route
        exact
        key="/profil-update"
        path="/profil-update"
        render={() => {
          return <ProfilUpdate />;
        }}
      />
      <Route
        exact
        key="/donations"
        path="/donations"
        render={() => {
          return <Donations />;
        }}
      />
      <Route
        exact
        key="/shopkeeper"
        path="/shopkeeper"
        render={() => {
          return <Shopkeeper />;
        }}
      />
      <Route
        exact
        key="/beneficiary"
        path="/beneficiary"
        render={() => {
          return <Beneficiary />;
        }}
      />
      <Route
        exact
        key="/payment"
        path="/payment"
        render={() => {
          return <Payment />;
        }}
      />
      <Route
        key="/shopkeeper/:id"
        path="/shopkeeper/:id"
        render={() => {
          return <ShopkeeperDonation />;
        }}
      />
      <Route
        key="/beneficiary/:id"
        path="/beneficiary/:id"
        render={() => {
          return <BeneficiaryDetails />;
        }}
      />
      <Route
        exact
        key="/add-product"
        path="/add-product"
        render={() => {
          return <AddProduct />;
        }}
      />
      <Route
        exact
        key="/edit-product/:id"
        path="/edit-product/:id"
        render={() => {
          return <EditProduct />;
        }}
      />
      <Route
        render={() => {
          return <Error404 />;
        }}
        status={404}
      />
    </Switch>
    <Footer />
  </>
);

export default App;

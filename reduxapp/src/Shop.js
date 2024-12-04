import React from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './state/index';

const Shop = () => {
  const dispatch = useDispatch();
  const { withdrawMoney, depositMoney } = bindActionCreators(actionCreators, dispatch);

  return (
    <div className="container my-5">
      <h2>Deposit / Withdraw Money</h2>

      <button
        className="btn btn-primary"
        onClick={() => withdrawMoney(100)}
      >
        -
      </button>
      <label className="mx-2">Update Balance</label>
      <button
        className="btn btn-primary"
        onClick={() => depositMoney(100)}
      >
        +
      </button>
    </div>
  );
};

export default Shop;

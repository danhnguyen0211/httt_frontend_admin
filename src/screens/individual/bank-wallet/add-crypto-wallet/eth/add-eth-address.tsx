import React from "react";
import { MDBInput, MDBBtn, MDBCol, MDBRow, MDBSpinner, MDBAlert } from "mdbreact";

const ETHAddAddressComponent = props => {
  return (
    <MDBRow md="12">
      <MDBCol md="8">
        <MDBInput
          label="Ethereum Public Address"
          className="mt-4"
          value={props.data.cryptoCurrencyAddress}
          name="cryptoCurrencyAddress"
          onChange={event => props.inputChange(event)}
          type="text"
          onBlur={event => props.onBlurChange(event)}
          required
        />
        {!props.data.isValidCrypto ? (
          <MDBAlert color="danger">This CryptoCurrency Wallet address is invalid, please try again!</MDBAlert>
        ) : null}
        {props.data.isExited ? (
          <MDBAlert color="danger">CryptoCurrency wallet already exists, please try again!</MDBAlert>
        ) : null}
        <MDBBtn
          style={{ float: "left", marginLeft: 0 }}
          color="primary"
          disabled={!props.data.formValid || props.data.isLoading}
          type="submit"
        >
          Continue {props.data.isLoading ? <MDBSpinner small /> : null}
        </MDBBtn>
      </MDBCol>
    </MDBRow>
  );
};

export default ETHAddAddressComponent;

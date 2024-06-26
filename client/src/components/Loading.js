import React from 'react';
import { Dna } from 'react-loader-spinner'


const Loader = () => (
    <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper" />
)

export default Loader;
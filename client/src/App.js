import React, { useState } from 'react';
import axios from 'axios';
import { isNumber } from 'util';

function App() {
  const [subscription, setSubscription] = useState('');
  const [tenor, setTenor] = useState('');
  const [interest, setInterest] = useState('');
  const [investment, setInvestment] = useState('');
  const [error, setError] = useState('');
  const onSubscriptionChange = e => {
    setSubscription(e.target.value);
  };

  const onTenorChange = e => {
    setTenor(e.target.value);
  };
  const onInterestChange = e => {
    setInterest(e.target.value);
  };
  const onSubmit = async e => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      if (
        subscription !== isNumber ||
        tenor !== isNumber ||
        interest !== isNumber
      ) {
        setError('The values have to be numbers');
      }

      const data = JSON.stringify({ subscription, tenor, interest });
      const response = await axios.post(
        'http://localhost:3500/calculate',
        data,
        config
      );
      if (response.data) {
        setError('');
        setInvestment(response.data);
      }
    } catch (error) {
      // console.log(error);
    }
  };
  return (
    <div style={{ marginTop: '150px' }} className='App'>
      <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-hot-pink'>
        <main className='pa4 black-80'>
          <form className='measure'>
            <fieldset className='ba b--transparent ph0 mh0'>
              <legend className='f4 fw6 ph0 mh0'>Investment Calculator</legend>
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='subscription'>
                  Monthly Subscription
                </label>
                <input
                  onChange={onSubscriptionChange}
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='text'
                  subscription='subscription'
                  id='subscription'
                  autoComplete='off'
                  value={subscription}
                />
              </div>
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='tenor'>
                  Tenor(Months)
                </label>
                <input
                  onChange={onTenorChange}
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='tenor'
                  name='tenor'
                  id='tenor'
                  autoComplete='off'
                  value={tenor}
                />
              </div>
              <div className='mv3'>
                <label className='db fw6 lh-copy f6' htmlFor='interest'>
                  Interest Rate(Per annum)
                </label>
                <input
                  onChange={onInterestChange}
                  className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='interest'
                  name='interest'
                  id='interest'
                  autoComplete='off'
                  value={interest}
                />
              </div>
            </fieldset>
            <div className=''>
              <input
                onClick={onSubmit}
                className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                type='submit'
                value='Calculate'
              />
              <div className=''>
                <br />
                {error}
              </div>
            </div>
          </form>
          <br />
          <div className=''>You should invest: {investment}</div>
        </main>
      </article>
    </div>
  );
}

export default App;

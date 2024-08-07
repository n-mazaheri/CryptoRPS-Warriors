import './landing.css';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      {' '}
      <header className="header">
        <div className="hcol1">
          <div className="headerText1">Decentralized </div>
          <div className="headerText2">CryptoRPS Warriors</div>
          <div className="headerText3">
            {' '}
            <button class="button" onClick={() => navigate('/login')}>
              Try Now
            </button>
          </div>
        </div>
        <div className="hcol2">
          <div className="imagesParent">
            <img src="img/coins.png" className="coins" />
            <img src="img/game.png" className="logo1" />
          </div>
        </div>
      </header>
      <div className="about">
        <div className="acol1">
          <div className="border"></div>
          <img src="./img/hands.jpeg" className="hands" />
        </div>
        <div className="acol2">
          <div className="ahead">How to play</div>
          <div className="atext">
            <p>
              Rock paper scissors is an intransitive hand game, usually played between two people, in which each player
              simultaneously forms one of three shapes with an outstretched hand. These shapes are "rock" (a closed
              fist), "paper" (a flat hand), and "scissors" (a fist with the index finger and middle finger extended,
              forming a V).
            </p>
            <p>
              One popular five-weapon expansion is "rock paper scissors Spock lizard", invented by Sam Kass and Karen
              Bryla which adds "Spock" and "lizard" to the standard three choices. "Spock" is signified with the Star
              Trek Vulcan salute, while "lizard" is shown by forming the hand into a sock-puppet-like mouth.
            </p>
          </div>
        </div>
      </div>
      <div className="featurs-parent">
        <div className="featurs">
          <div className="ahead">Features</div>
          <div className="atext">
            <ul>
              <li>Web3 based decentralized game based on Blockchain and Smart Contacts</li>
              <li>User can play multiple games simultanslly </li>
              <li>User can choose amount of bet and other player for each game</li>
              <li>Money will keep in smart contract and will automatically move to winner wallet </li>
              <li>Money will return back to user wallet if other player dont do any movement in specific time. </li>
            </ul>
          </div>
        </div>
        <div>
          <img src="./img/blockchain.png" className="blockchain"></img>
        </div>
      </div>
      <div className="contact">
        <div className="ccol1">
          <div className="ahead">Game Steps</div>
          <div className="atext">
            <b>1. </b> Connect to your wallet <br />
            <b>2. </b> Select other player <br />
            <b>3. </b> Choose bet amount <br />
            <b>4. </b> Wait for other player movement <br />
          </div>
        </div>
        <div className="ccol2">
          <div className="dogsImages">
            <img src="img/hands3.jpeg" alt="Image" className="img-fluid cover-img" />
          </div>
        </div>
      </div>
      <div className="footer" id="footer">
        <div className="fhead">Cuntact Us</div>
        <div>
          <div className="ftext">
            <img src="./img/email.svg" />
            <span>Email:</span> <a href="mailto:Na.Mazaheri@yahoo.com">Na.Mazaheri@yahoo.com </a>{' '}
          </div>
          <div className="ftext">
            <img src="./img/phone2.svg" />
            <span>Phone:</span> <a href="tel:+989134021934"> +989134021934 </a>
          </div>
        </div>
      </div>
    </>
  );
}

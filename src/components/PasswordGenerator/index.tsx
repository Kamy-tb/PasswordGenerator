import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useState } from 'react'
import passwordGif from '../../assets/gif/password.gif'
import { ReactComponent as Copy } from '../../assets/icons/copy.svg'
import { ReactComponent as Refresh } from '../../assets/icons/refresh.svg'
import Checkbox from '../Checkbox'
import './index.css'
import Handle from 'rc-slider/lib/Handles/Handle'
import { CopyToClipboard } from 'react-copy-to-clipboard';

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState<number>(8)
  // For the conditions to check
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(true);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const [passwordValue, setPasswordValue] = useState<string>("")
  const [copyButtonText, setCopyButtonText] = useState('Copy');
  const [msgValue, setmsgValue] = useState("weak");
  const [msgColor , setmsgColor] = useState("green");

 
  // Check if all checkboxes are unchecked
  const allUnchecked = isChecked1 === false && isChecked2 === false && isChecked3 === false && isChecked4 === false;
    if (allUnchecked) {
      setIsChecked2(true);
    }

  const onChangePasswordLength = (value: number | number[]) => {setPasswordLength(value as number)}
  const handleChangeUpper = (event: { target: { checked: boolean | ((prevState: boolean) => boolean) } }) => {
    setIsChecked1(event.target.checked);
    
  };
  
    const handleChangeLower = (event: { target: { checked: boolean | ((prevState: boolean) => boolean) } }) => {
    setIsChecked2(event.target.checked);};
  
  const handleChangeNmb = (event: { target: { checked: boolean | ((prevState: boolean) => boolean) } }) => {
    setIsChecked3(event.target.checked)};
  
  const handleChangeSpecialCh = (event: { target: { checked: boolean | ((prevState: boolean) => boolean) } }) => {
    setIsChecked4(event.target.checked);};


  // To generate the password
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const lowerCase = "abcdefghijklmnopqrstuvwxyz"
  const numbers = "0123456789"
  const specialCh = "!@#$%^&*()"
  const generateRandomPassword = (passwordLength: number, ischecked1: boolean, ischecked2: boolean, ischecked3: boolean, ischecked4: boolean) => {
  let allChars = '';
  let password = '';

  if (ischecked1) allChars += upperCase;
  if (ischecked2) allChars += lowerCase;
  if (ischecked3) allChars += numbers;
  if (ischecked4) allChars += specialCh;

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }
  return password;
};

  const handleGeneratePassword = () => {
    const newPassword = generateRandomPassword(passwordLength, isChecked1, isChecked2, isChecked3, isChecked4);
    setPasswordValue(newPassword);
    if (newPassword.length < 8) {
      setmsgColor("red")
      setmsgValue("Too short")
    } 
    else{
      const trueCount = [isChecked1, isChecked2, isChecked3, isChecked4].filter(value => value).length;
      if (trueCount === 4) {
        setmsgColor("green")
        setmsgValue("Hard")
      } else if (trueCount === 3) {
        setmsgColor("orange")
        setmsgValue("Medium")
      } else if (trueCount >= 2) {
        setmsgColor("red")
        setmsgValue("Weak")}
    }
    
  };

  

  const handleCopy = () => {
    navigator.clipboard.writeText(passwordValue);
    setCopyButtonText('Copied');
    setTimeout(() => {
      setCopyButtonText('Copy');
    }, 1000);
  };

  const textStyle = {
    color: msgColor
  }

  

  return (
    <div className="password-wrapper">
      <div className="gif">
        <img src={passwordGif} alt="Password Gif" />
      </div>
      <div className="tac">
        <h2 className="title">PASSWORD GENERATOR</h2>
        <p className="subtitle">
          Create strong and secure passwords to keep your account safe online.
        </p>
      </div>
      <div className="password-input-wrapper">
        <div className="password-field">
          <input type="text" placeholder="your password" value={passwordValue} 
       />
          <button>
          <Refresh onClick={handleGeneratePassword} />
          </button>
        </div>
      
        
          <button className="copy-btn" onClick={handleCopy} >
              <Copy /> {copyButtonText}
          </button>
        
    

      </div>
      <span className="fw-500" style={textStyle}> {msgValue} </span>
      <div className="slider">
        <div>
          <label id="slider-label">Password Length: </label>
          <span>{passwordLength}</span>
        </div>
        <Slider
          max={30}
          min={5}
          value={passwordLength}
          onChange={onChangePasswordLength}
          className="slider-style"
        />
      </div>

      <div className="elements" >
        <Checkbox id="uppercase" label="Uppercase" checked={isChecked1} name="upper" onChange={handleChangeUpper}/>
        <Checkbox id="lowercase" label="Lowercase" checked={isChecked2} name="lower" onChange={handleChangeLower} />
        <Checkbox id="numbers" label="Numbers" checked={isChecked3} name="numbers" onChange={handleChangeNmb}/>
        <Checkbox
          id="special chars"
          label="Special Characters"
          checked={isChecked4}
          name="specialChars"
          onChange={handleChangeSpecialCh}
        />
      </div>
    </div>
  )
}

export default PasswordGenerator
function setPassword(value: string | string[]) {
  throw new Error('Function not implemented.')
}

function setCopyButtonText(arg0: string) {
  throw new Error('Function not implemented.')
}


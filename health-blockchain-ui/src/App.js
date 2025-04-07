import React, { useState } from "react";
import { connectWallet, getEthereumContract } from "./blockchain";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    allergies: "",
    history: ""
  });

  const [patientAddress, setPatientAddress] = useState("");
  const [fetchedRecord, setFetchedRecord] = useState(null);

  const handleConnectWallet = async () => {
    const walletAddress = await connectWallet();
    if (walletAddress) setAccount(walletAddress);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitRecord = async () => {
    const contract = await getEthereumContract();
    const tx = await contract.addMedicalRecord(
      form.name,
      parseInt(form.age),
      form.gender,
      form.allergies,
      form.history
    );
    await tx.wait();
    alert("Record submitted!");
  };

  const fetchRecord = async () => {
    const contract = await getEthereumContract();
    const record = await contract.getMedicalRecord(patientAddress);
    setFetchedRecord(record);
  };

  return (
    <div className="App">
      <h1>🩺 Health Record DApp</h1>

      {!account ? (
        <button onClick={handleConnectWallet}>Connect MetaMask</button>
      ) : (
        <p>Connected Wallet: {account}</p>
      )}

      <h2>Add Medical Record</h2>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="age" type="number" placeholder="Age" onChange={handleChange} />
      <input name="gender" placeholder="Gender" onChange={handleChange} />
      <input name="allergies" placeholder="Allergies" onChange={handleChange} />
      <input name="history" placeholder="Medical History" onChange={handleChange} />
      <button onClick={submitRecord}>Submit Record</button>

      <h2>Get Patient Record</h2>
      <input
        placeholder="Enter patient address"
        value={patientAddress}
        onChange={(e) => setPatientAddress(e.target.value)}
      />
      <button onClick={fetchRecord}>Fetch</button>

      {fetchedRecord && (
        <div className="record">
          <h3>Fetched Record:</h3>
          <p><strong>Name:</strong> {fetchedRecord.name}</p>
          <p><strong>Age:</strong> {fetchedRecord.age.toString()}</p>
          <p><strong>Gender:</strong> {fetchedRecord.gender}</p>
          <p><strong>Allergies:</strong> {fetchedRecord.allergies}</p>
          <p><strong>History:</strong> {fetchedRecord.history}</p>
        </div>
      )}
    </div>
  );
}

export default App;



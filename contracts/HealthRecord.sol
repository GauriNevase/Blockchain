// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HealthRecord {
    struct Record {
        string name;
        uint age;
        string gender;
        string allergies;
        string history;
    }

    mapping(address => Record) private records;
    address[] private patients;

    event RecordAdded(address indexed patient, string name, uint age);

    function addMedicalRecord(
        string memory _name,
        uint _age,
        string memory _gender,
        string memory _allergies,
        string memory _history
    ) public {
        records[msg.sender] = Record(_name, _age, _gender, _allergies, _history);
        patients.push(msg.sender);
        emit RecordAdded(msg.sender, _name, _age);
    }

    function getMedicalRecord(address _patient) public view returns (Record memory) {
        return records[_patient];
    }
}

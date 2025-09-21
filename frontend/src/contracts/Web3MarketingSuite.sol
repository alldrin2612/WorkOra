// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Web3MarketingSuite {
    // Structs to define the user types
    struct freelancer {
        string name;
        address walletAddress;
    }

    struct Business {
        string name;
    }

    // Mapping to store freelancers by their wallet address
    mapping(address => freelancer) public freelancersByAddress;

    // Mapping to store freelancers by their name
    mapping(string => address) public freelancersByName;

    // Mapping to store businesses by their name
    mapping(string => Business) public businesses;

    // Mapping to store campaigns by their campaign name
    mapping(string => Campaign) public campaignsByName;

    // Struct to represent a campaign
    struct Campaign {
        string businessName;
        string campaignName;
        mapping(string => bool) freelancers; // Mapping to store freelancers in the campaign
        string[] freelancerNames; // Array to store freelancer names
    }

    // Event to emit when a new freelancer is registered
    event freelancerRegistered(address indexed walletAddress, string name);

    // Event to emit when a new business is registered
    event BusinessRegistered(string indexed name);

    // Event to emit when a campaign is created
    event CampaignCreated(string indexed campaignName, string businessName);

    // Event to emit when a transaction is made to an freelancer
    event TransactionTofreelancer(string indexed freelancerName, address indexed freelancerAddress, uint256 amount);

    // Function to register a new freelancer
    function registerfreelancer(string memory _name, address _walletAddress) public {
        require(_walletAddress != address(0), "Wallet address cannot be the zero address");
        require(bytes(_name).length > 0, "freelancer name cannot be empty");
        require(freelancersByName[_name] == address(0), "freelancer with this name already exists");
        
        freelancersByAddress[_walletAddress] = freelancer(_name, _walletAddress);
        freelancersByName[_name] = _walletAddress;
        
        emit freelancerRegistered(_walletAddress, _name);
    }

    // Function to register a new business
    function registerBusiness(string memory _name) public {
        require(bytes(_name).length > 0, "Business name cannot be empty");
        businesses[_name] = Business(_name);
        emit BusinessRegistered(_name);
    }

    // Function to create a new campaign
    function createCampaign(string memory _businessName, string memory _campaignName) public {
        require(bytes(_businessName).length > 0, "Business name cannot be empty");
        require(bytes(_campaignName).length > 0, "Campaign name cannot be empty");

        // Create the campaign with the campaign name as the key
        Campaign storage newCampaign = campaignsByName[_campaignName];
        newCampaign.businessName = _businessName;
        newCampaign.campaignName = _campaignName;

        emit CampaignCreated(_campaignName, _businessName);
    }

    // Function to add an freelancer to a campaign
    function addfreelancerToCampaign(string memory _campaignName, string memory _freelancerName) public {
        require(bytes(_freelancerName).length > 0, "freelancer name cannot be empty");
        require(freelancersByName[_freelancerName] != address(0), "freelancer does not exist");

        // Add the freelancer to the campaign
        campaignsByName[_campaignName].freelancers[_freelancerName] = true;
        campaignsByName[_campaignName].freelancerNames.push(_freelancerName); // Add the freelancer name to the array
    }

    // Function to make a transaction to an freelancer in a campaign
    function makeTransactionTofreelancer(string memory _campaignName, string memory _freelancerName, uint256 _amount) public payable {
        require(_amount > 0, "Amount must be greater than 0");
        require(campaignsByName[_campaignName].freelancers[_freelancerName], "freelancer is not part of the campaign");

        address freelancerAddress = freelancersByName[_freelancerName];
        require(freelancerAddress != address(0), "freelancer with this name does not exist");

        // Set a maximum gas limit for the transaction
        uint256 maxGas = 100000; // Example maximum gas limit

        // Transfer funds to the freelancer's address with the maximum gas limit
        (bool success, ) = payable(freelancerAddress).call{value: _amount, gas: maxGas}("");
        require(success, "Failed to send Ether to freelancer");

        emit TransactionTofreelancer(_freelancerName, freelancerAddress, _amount);
    }
}
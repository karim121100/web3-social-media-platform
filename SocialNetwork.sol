// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract SocialNetwork is ReentrancyGuard {
    uint256 public postCount = 0;

    struct Post {
        uint256 id;
        string content; // Text or IPFS Hash
        uint256 tipAmount;
        address payable author;
        uint256 timestamp;
    }

    struct Profile {
        string username;
        string bio;
        bool exists;
    }

    mapping(uint256 => Post) public posts;
    mapping(address => Profile) public profiles;

    event PostCreated(uint256 indexed id, string content, address indexed author, uint256 timestamp);
    event PostTipped(uint256 indexed id, address indexed from, uint256 amount);
    event ProfileUpdated(address indexed user, string username);

    function setProfile(string memory _username, string memory _bio) external {
        profiles[msg.sender] = Profile(_username, _bio, true);
        emit ProfileUpdated(msg.sender, _username);
    }

    function createPost(string memory _content) external {
        require(bytes(_content).length > 0, "Content cannot be empty");
        
        postCount++;
        posts[postCount] = Post(postCount, _content, 0, payable(msg.sender), block.timestamp);
        
        emit PostCreated(postCount, _content, msg.sender, block.timestamp);
    }

    function tipPost(uint256 _id) external payable nonReentrant {
        require(_id > 0 && _id <= postCount, "Invalid post ID");
        Post storage _post = posts[_id];
        require(msg.sender != _post.author, "Cannot tip self");

        _post.tipAmount += msg.value;
        (bool success, ) = _post.author.call{value: msg.value}("");
        require(success, "Tip failed");

        emit PostTipped(_id, msg.sender, msg.value);
    }

    function getPost(uint256 _id) external view returns (Post memory) {
        return posts[_id];
    }
}

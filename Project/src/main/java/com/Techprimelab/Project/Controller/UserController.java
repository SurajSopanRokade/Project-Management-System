package com.Techprimelab.Project.Controller;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.Enumeration;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.session.Session;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Techprimelab.Project.IServices.IUserService;
import com.Techprimelab.Project.Models.User;
import com.Techprimelab.Project.repositories.UserRepo;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/user")
public class UserController {

	@Autowired
	private IUserService userservice;

	@Autowired
	private UserRepo userRepo;

	HttpSession session;

	// RequestBody annotation map the HttpRequest body to a transfer enabling
	// automatic deserializzation of inbound HttpRequest body onto a java object
	@PostMapping("/saveUser")
	public User saveUser(@RequestBody User u) {
		User res = null;
		System.out.println("inside saveUser");
		try {
			System.out.println("User saved");
			res = userservice.saveUser(u);
		}

		catch (Exception ex) {
			System.out.println(ex.getMessage());
		}
		return res;
	}

	@GetMapping("/getAllUsers")
	public List<User> getAllUsers() {
		return userservice.getAllUsers();
	}

	@DeleteMapping("/deleteUser/{id}")
	public void deleteUser(@PathVariable int id) {
		try {
			userservice.deleteUser(id);
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		}
	}

	@PutMapping("/updateUser")
	public User updateUser(@RequestBody User u) {
		User res = null;
		System.out.println("inside updateUser");
		try {
			System.out.println("User updated");
			res = userservice.updateUser(u);
		}

		catch (Exception ex) {
			System.out.println(ex.getMessage());
		}
		return res;
	}

	@GetMapping("/searchUserById/{id}")
	public User searchUserById(@PathVariable int id) {
		User res = null;

		try {
			res = userservice.searchUserById(id);

		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		}
		return res;
	}

	@GetMapping("/findByGmail/{email}")
	public ResponseEntity<User> findByEmail(@PathVariable String email) throws Exception {
		User user = userRepo.findByEmail(email);
		return ResponseEntity.ok(user);
	}

	@GetMapping("/findByContact/{contact}")
	public ResponseEntity<User> findByContact(@PathVariable String contact) throws Exception {
		User user = userRepo.findByContact(contact);
		return ResponseEntity.ok(user);
	}
//Login endpoint
//@PostMapping("/login")
//   public ResponseEntity<?> login(@RequestBody User user) {
//       
//       User user1 = userservice.authenticate(user.getEmail(), user.getPassword());
//       if (user1 != null) {
//           // Authentication successful, return JSON object with success status
//           return ResponseEntity.ok().body("{\"status\": \"success\", \"message\": \"Login successful\",\"userRole\": \"" + user1.getUserRole() + "\"}");
//       } else {
//           
//           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"status\": \"error\", \"message\": \"Invalid username or password\"}");
//       }
//   }

//@PostMapping("/login")
//public ResponseEntity<String> login(@RequestBody User user, HttpSession session){
// User user1 = userservice.authenticate(user.getEmail(), user.getPassword());
// 
// 
// if (user1 != null) {
//   
//   // Authentication successful, store user details in session
//   session.setAttribute("user", user1);
//   System.out.println("User logged in: " + user1.getEmail());
//   return ResponseEntity.ok()
//       .body("{\"status\": \"success\", \"message\": \"Login successful\",\"userRole\": \""
//           + user.getUserRole() + "\"}");
// } else {
//   // Authentication failed
//   return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//       .body("{\"status\": \"error\", \"message\": \"Invalid username or password\"}");
// }
//}
//
//@GetMapping("/getSession")
//public ResponseEntity<String> getSession( HttpSession session) {
//  User user = (User) session.getAttribute("user");
// 
// if (user.getEmail() != null) {
//   
//   // Retrieve serialized User object from session
//   
//   // Session exists, return session information
//   System.out.println("User email: " + user.getEmail());
//   return ResponseEntity.ok().body(user.getEmail());
// } else {
//   // Session does not exist or user is not logged in
//   return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No active session or user not logged in");
// }
//}
//
//@PostMapping("/logout")
//public ResponseEntity<String> logout(HttpServletRequest request) {
//  HttpSession session = request.getSession(false);
// session.invalidate();
// System.out.println("User logged out");
// return ResponseEntity.ok().body("{\"status\": \"logoutsuccess\", \"message\": \"Logout successful\"}");
//}

	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody User user, HttpServletRequest request) {
		session = request.getSession();
		System.out.println("login..." + session);
		User user1 = userservice.authenticate(user.getEmail(), user.getPassword());
		if (user1.getEmail() != null) {
			// Store user's email directly in the session
			session.setAttribute("user", user1.getEmail());
			System.out.println("User logged in: " + user1.getEmail() + " " + user1.getUserRole());
			System.out.println("Userrole : " + user1.getUserRole());
			return ResponseEntity.ok()
					.body("{\"status\": \"success\", \"message\": \"Login successful\",\"userRole\": \""
							+ user.getUserRole() + "\"}");
		} else {
			// Authentication failed
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body("{\"status\": \"error\", \"message\": \"Invalid username or password\"}");
		}
	}

	@GetMapping("/getSession")
	public ResponseEntity<String> getSession(HttpServletRequest request) {
		// session = request.getSession(false);
		System.out.println("getSession..." + session);
		System.out.println(session.isNew());
		if (session != null) {
			String userEmail = (String) session.getAttribute("user");
			if (userEmail != null) {
				// Session exists and user is logged in
				System.out.println("User retrieved from session: " + userEmail);
				return ResponseEntity.ok().body(userEmail);
			} else {
				// User is not logged in
				System.out.println("No active session or user not logged in");
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No active session or user not logged in");
			}
		} else {
			// No session exists
			System.out.println("No session exists");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No session exists");
		}
	}

}
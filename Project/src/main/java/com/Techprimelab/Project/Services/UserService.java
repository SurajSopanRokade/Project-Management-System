package com.Techprimelab.Project.Services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;


import com.Techprimelab.Project.IServices.IUserService;
import com.Techprimelab.Project.Models.User;
import com.Techprimelab.Project.repositories.UserRepo;

import jakarta.transaction.Transactional;


@Service
@Transactional
public class UserService implements IUserService {

	@Autowired
	private UserRepo userrepo;

	@Override
	public List<User> getAllUsers() {
		List<User> userlist = userrepo.findAll();
		return userlist;
	}

	@Override
	public User saveUser(User u) {
		User res = userrepo.save(u);
		return res;
	}

	@Override
	public User updateUser(User u) {
		User res = userrepo.save(u);
		return res;
	}

	@Override
	public void deleteUser(int id) {
		userrepo.deleteById(id);

	}

	@Override
	public User searchUserById(int id) {

		User res = userrepo.findById(id).get();
		return res;

	}
	
	public User authenticate(String email, String password) {
        User user = userrepo.findByEmail(email);
        if (user != null && email.equals(user.getEmail()) && password.equals(user.getPassword())) {
            return user;
        }
        return null; // Authentication failed
    }
	
	


  
}


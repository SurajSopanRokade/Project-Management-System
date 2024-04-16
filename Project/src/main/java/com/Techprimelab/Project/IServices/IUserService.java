package com.Techprimelab.Project.IServices;

import java.util.List;



import com.Techprimelab.Project.Models.User;




public interface IUserService {

	List<User> getAllUsers();
	User saveUser(User u);
	User updateUser(User u);
	void deleteUser(int id);
	User searchUserById(int id);
	User authenticate(String email, String password);
}
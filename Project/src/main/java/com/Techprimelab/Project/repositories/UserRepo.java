package com.Techprimelab.Project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.Techprimelab.Project.Models.User;

public interface UserRepo extends JpaRepository<User, Integer> {
	
//	@Query(value = "SELECT * FROM users WHERE email =:email", nativeQuery = true)
//	public User findByEmail(@Param("email") String email);
	
	public User findByEmail(String email);
	
//	@Query(value = "SELECT * FROM users WHERE contact =:contact", nativeQuery = true)
//	public User findByContact(@Param("contact") String contact);
	
	public User findByContact(String contact);
}

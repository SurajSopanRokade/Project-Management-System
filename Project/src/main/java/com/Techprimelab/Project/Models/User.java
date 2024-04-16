package com.Techprimelab.Project.Models;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "Users")
public class User implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "Username", nullable = false)
    private String username;

    @Column(name = "Email", nullable = false, unique = true)
    private String email;

    @Column(name = "Contact", nullable = false, unique = true)
    private String contact;

    @Column(name = "Pass_word", nullable = false)
    private String password;

    @Column(name = "Address", nullable = false)
    private String address;

    @Column(name = "Userrole", columnDefinition = "VARCHAR(15)")
    private String userRole = "user";

    
//    @OneToMany(mappedBy="user")
//    private List<ProjectUser> projectUser; 
    
    
	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", email=" + email + ", contact=" + contact + ", password="
				+ password + ", address=" + address + ", userRole=" + userRole + "]";
	}
    
    
}

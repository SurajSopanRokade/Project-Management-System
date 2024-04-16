package com.Techprimelab.Project.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "project_user")
public class ProjectUser {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int projectUserId;

  
  
  
  @ManyToOne
  @JoinColumn(name="projectId",referencedColumnName="id")
  private Project project;
  
  
  @ManyToOne
  @JoinColumn(name="userId",referencedColumnName="id")
  private User user;

}
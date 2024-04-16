package com.Techprimelab.Project.Models;

import java.sql.Date;
import java.util.List;

import org.springframework.stereotype.Component;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Component
@Entity
@Table(name = "project")
public class Project {
	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "Id")
	    private int id;

	    @Column(name = "project_name")
	    private String projectName;

	    @ManyToOne
	    @JoinColumn(name = "reason_id", referencedColumnName = "reasonid")
	    private Reason reason;

	    @ManyToOne
	    @JoinColumn(name = "type_id", referencedColumnName = "typeid")
	    private Type type;

	    @ManyToOne
	    @JoinColumn(name = "division_id", referencedColumnName = "divisionid")
	    private Division division;

	    @ManyToOne
	    @JoinColumn(name = "category_id", referencedColumnName = "categoryid")
	    private Category category;

	    @ManyToOne
	    @JoinColumn(name = "priority_id", referencedColumnName = "priorityid")
	    private Priority priority;
	    @ManyToOne
	    @JoinColumn(name = "department_id", referencedColumnName = "departmentid")
	    private Department department;

	    @Column(name = "start_date")
	    private Date startDate;

	    @Column(name = "end_date")
	    private Date endDate;

	    @ManyToOne
	    @JoinColumn(name = "location_id", referencedColumnName = "locationid")
	    private Location location;

	    @ManyToOne
	    @JoinColumn(name = "status_id", referencedColumnName = "statusid")
	    private Status status;

	}

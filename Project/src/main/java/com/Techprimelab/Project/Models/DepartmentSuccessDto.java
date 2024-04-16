package com.Techprimelab.Project.Models;

public class DepartmentSuccessDto {
    private String departmentName;
    private long totalProjects;
    private long closedProjects;
    private double successRate;

   
    public DepartmentSuccessDto(String departmentName, long totalProjects, long closedProjects, double successRate) {
        this.departmentName = departmentName;
        this.totalProjects = totalProjects;
        this.closedProjects = closedProjects;
        this.successRate = successRate;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public long getTotalProjects() {
        return totalProjects;
    }

    public void setTotalProjects(long totalProjects) {
        this.totalProjects = totalProjects;
    }

    public long getClosedProjects() {
        return closedProjects;
    }

    public void setClosedProjects(long closedProjects) {
        this.closedProjects = closedProjects;
    }

    public double getSuccessRate() {
        return successRate;
    }

    public void setSuccessRate(double successRate) {
        this.successRate = successRate;
    }
}


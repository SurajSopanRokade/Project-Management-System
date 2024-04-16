export class DepartmentSuccessDto {
    departmentName: string;
    totalProjects: number;
    closedProjects: number;
    successRate: number;

    constructor(departmentName: string, totalProjects: number, closedProjects: number, successRate: number) {
        this.departmentName = departmentName;
        this.totalProjects = totalProjects;
        this.closedProjects = closedProjects;
        this.successRate = successRate;
    }
}

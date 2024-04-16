import { Category } from "./Category";
import { Department } from "./Department";
import { Division } from "./Division";
import { Priority } from "./Priority";
import { Reasons } from "./Reasons";
import { Type } from "./Type";
import { Location } from "./Location";
import { Status } from "./status";
import { User } from "./user";

export class Project {
  id: number;
  projectName: string;
  reason: Reasons;
  type: Type;
  division: Division;
  category: Category;
  priority: Priority;
  department: Department;
  startDate: Date;
  endDate: Date;
  location: Location;
  status: Status;
  user: User;
  

 
  constructor(
    id: number = 0,
    projectName: string = '',
    reason: Reasons = new Reasons(1,""),
    type: Type = new Type(1,""),
    division: Division = new Division(1,""),
    category: Category = new Category(1,""),
    priority: Priority = new Priority(1,""),
    department: Department = new Department(1,""),
    startDate: Date = new Date(),
    endDate: Date = new Date(),
    location: Location = new Location(1,""),
    status: Status = new Status(1,""),
    user: User = new User()
  ) {
    this.id = id;
    this.projectName = projectName;
    this.reason = reason;
    this.type = type;
    this.division = division;
    this.category = category;
    this.priority = priority;
    this.department = department;
    this.startDate = startDate;
    this.endDate = endDate;
    this.location = location;
    this.status = status;
    this.user = user;
  }
}
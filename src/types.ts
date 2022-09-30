
export interface Employee {
  idEmployee: number,
  firstLastName: string,
  numberWorkbook: string,
  jmbg: string,
}

export interface InternalComplaintRule {
  idInternalComplaintRule: number | null | undefined,
  name: string,
  dateEntry: string,
  description: string,
  subjectRule: SubjectRule
}
export interface SubjectRule {
  idSubjectRule: number,
  nameSubjectRule: string
}

export interface Product {
  productId: number,
  name: string,
  price: number,
  dateProduction: string,
  typeProduct: string,
  currentState: number
}

export interface OrderItem {
  id: number | null | undefined,
  quantity: number,
  value: number,
  product: Product
}

export interface Order {
  id: number | null | undefined,
  amount: number,
  note: string,
  dateOrder: string,
  employee: Employee,
  listItems: OrderItem[]
}

export interface WriteOrderItem {
  id: number | null | undefined,
  quantity: number,
  productId: number | null
}
export interface WriteOrder {
  dateOrder: number | Date | null,
  note: string,
  employeeId: number | null,
  deleteItemIds?: number[],
  items?: WriteOrderItem[]
}
export interface WriteInternalComplaintRuleDto {
  name: string,
  dateEntry: Date | number | null,
  description: string,
  subjectRuleId: number | null
}
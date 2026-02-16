import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "invoices" })
export class Invoice {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 36 })
  productId!: string;

  @Column({ type: "varchar", length: 200 })
  productTitle!: string;

  @Column({ type: "numeric", precision: 12, scale: 2 })
  price!: string;

  @Column({ type: "varchar", length: 10 })
  currency!: string;

  @Column({ type: "int", default: 1 })
  quantity!: number;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;
}

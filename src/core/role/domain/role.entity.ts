import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { RoleCreationAttrs } from '../infrastructure/role.interface';

@Table({ tableName: 'roles', paranoid: true })
export class Role extends Model<Role, RoleCreationAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	name: string;
}

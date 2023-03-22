import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { UserCreationAttrs } from '../infrastructure/user.interface';

@Table({ tableName: 'users', paranoid: true })
export class User extends Model<User, UserCreationAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	email: string;

	@Column({ type: DataType.STRING, allowNull: false })
	password: string;
}

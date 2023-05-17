import {
	BelongsToMany,
	Column,
	DataType,
	Model,
	Table,
} from 'sequelize-typescript';
import { User } from 'src/core/user/domain/user.entity';
import { RoleCreationAttrs } from './role.interface';

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

	@BelongsToMany(() => User, 'users_roles', 'role_id', 'user_id')
	users: User[];
}

import {
	BelongsToMany,
	Column,
	DataType,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript';
import { Meetup } from 'src/core/meetup/domain/meetup.entity';
import { Role } from 'src/core/role/domain/role.entity';
import { UserCreationAttrs } from './interfaces/user.interface';

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

	@BelongsToMany(() => Role, 'users_roles', 'user_id', 'role_id')
	roles: Role[];

	@HasMany(() => Meetup, 'author_id')
	meetups: Meetup[];

	@BelongsToMany(() => Meetup, 'meetups_users', 'user_id', 'meetup_id')
	invitedToMeetups: Meetup[];
}

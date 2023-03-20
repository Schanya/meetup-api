import {
	BelongsToMany,
	Column,
	DataType,
	Model,
	Table,
} from 'sequelize-typescript';
import { Flag } from 'src/core/flag/domain/flag.entity';
import { MeetupCreationAttrs } from '../infrastructure/meetup.interface';

@Table({ tableName: 'meetups', paranoid: true })
export class Meetup extends Model<Meetup, MeetupCreationAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@Column({ type: DataType.STRING, allowNull: false })
	title: string;

	@Column({ type: DataType.STRING })
	discription: string;

	@Column({ type: DataType.DATE, allowNull: false })
	time: Date;

	@Column({ type: DataType.STRING, allowNull: false })
	place: string;

	@BelongsToMany(() => Flag, 'meetups_flags', 'meetup_id', 'flag_id')
	flags: Flag[];
}

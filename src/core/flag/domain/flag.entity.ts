import {
	BelongsToMany,
	Column,
	DataType,
	Model,
	Table,
} from 'sequelize-typescript';

import { Meetup } from 'src/core/meetup/domain/meetup.entity';
import { FlagCreationAttrs } from '../infrastructure/flag.interface';

@Table({ tableName: 'flags', paranoid: true })
export class Flag extends Model<Flag, FlagCreationAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	name: string;

	@BelongsToMany(() => Meetup, 'meetups_flags', 'flag_id', 'meetup_id')
	meetups: Meetup[];
}

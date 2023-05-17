import { ApiProperty } from '@nestjs/swagger';
import { Meetup } from '../meetup.entity';

class Author {
	@ApiProperty({ description: 'Author identifier', example: 1 })
	id: number;
	@ApiProperty({ description: 'Author email', example: 'test@gmail.com' })
	email: string;
}

class Member {
	@ApiProperty({ description: 'Member identifier', examples: [2, 3] })
	id: number;
	@ApiProperty({
		description: 'Member email',
		examples: ['user@gmail.com', 'admin@gmail.com'],
	})
	email: string;
}

class Flag {
	@ApiProperty({ description: 'Flag (tag) identifier', examples: [2, 3] })
	id: number;
	@ApiProperty({
		description: 'Flag (tag) name',
		examples: ['Test', 'Example'],
	})
	name: string;
}

export class FrontendMeetup {
	@ApiProperty({ description: 'Meetup identifier', example: 1 })
	public id: number;
	@ApiProperty({ description: 'Meetup title', example: 'example' })
	public title: string;
	@ApiProperty({
		description: 'Meetup description',
		example: 'important meetup',
	})
	public description: string;
	@ApiProperty({
		description: 'Meetup time',
		example: '2023-02-27T20:00:00.000Z',
		type: Date,
	})
	public time: Date;
	@ApiProperty({ description: 'Meetup place', example: 'google meet' })
	public place: string;
	@ApiProperty({ description: 'Meetup author', type: Author })
	public author: Author;
	@ApiProperty({ description: 'Meetup members', type: [Member] })
	public members: Member[];
	@ApiProperty({ description: 'Meetup flags', type: [Flag] })
	public flags: Flag[];

	constructor(meetup: Meetup) {
		this.id = meetup.id;
		this.title = meetup.title;
		this.description = meetup.description;
		this.time = meetup.time;
		this.place = meetup.place;
		this.author = {
			id: meetup.author.id,
			email: meetup.author.email,
		};
		this.members = meetup.members.map((member) => ({
			id: member.id,
			email: member.email,
		}));
		this.flags = meetup.flags.map((flag) => ({
			id: flag.id,
			name: flag.name,
		}));
	}
}

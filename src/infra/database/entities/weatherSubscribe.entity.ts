import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type TWeatherSubscribeEntity = {
  id: number;
  userID: number;
  city: string;
  time: Date;
}

@Entity('weather_subscriptions')
class WeatherSubscribeEntity implements TWeatherSubscribeEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column() userID!: number;

  @Column({ type: 'text' }) city!: string;

  @Column({ type: 'timestamptz', nullable: true }) time!: Date;
}

export { WeatherSubscribeEntity };

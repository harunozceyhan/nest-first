import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm'
import { Length, IsNotEmpty } from 'class-validator'
import { Metaclass } from 'src/metadata/decorator/metaclass.decorator'

@Metaclass({
    baseUrl: 'city', formClass: '', deletable: true, tabs: [], addable: true, sortBy: 'updatedAt', detailTitleKey: 'name', columns:
        [{ responseKey: '', translateKey: '', data: '', formClass: '', type: 'text', required: true, tableValue: 'name', itemText: '', acceptedFiles: '', autoSelect: false, showInForm: true, min: 1, now: false, disabled: false, text: 'name', value: 'name', formType: 'text', max: 64, searchKey: 'name', sortable: true, rows: 5, url: '/', searchable: true, width: 55, updatable: true, showInTable: true },
        { responseKey: '', translateKey: '', data: '', formClass: '', type: 'text', required: true, tableValue: 'code', itemText: '', acceptedFiles: '', autoSelect: false, showInForm: true, min: 1, now: false, disabled: false, text: 'code', value: 'code', formType: 'text', max: 18, searchKey: 'code', sortable: true, rows: 5, url: '/', searchable: true, width: 40, updatable: true, showInTable: true }]
})
@Entity()
@Unique(['code'])
export class City {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @IsNotEmpty()
    @Length(1, 64)
    @Column({ length: 64 })
    name: string

    @IsNotEmpty()
    @Length(1, 18)
    @Column({ length: 18 })
    code: string

}
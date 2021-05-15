/* eslint-disable @typescript-eslint/no-empty-function */
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, AfterLoad, ManyToOne } from 'typeorm'
import { Metaclass } from 'src/metadata/decorator/metaclass.decorator'
import { City } from '../city/city.entity'

@Entity()
@Metaclass({
    baseUrl: 'users', formClass: '', detailTitleKey: 'nameSurname', deletable: true, tabs: [], addable: true, sortBy: 'updatedAt', columns:
        [{ responseKey: '', translateKey: '', data: '', formClass: '', type: 'text', required: true, tableValue: 'firstName', itemText: '', acceptedFiles: '', autoSelect: false, showInForm: true, min: 1, now: false, disabled: false, text: 'firstName', value: 'firstName', formType: 'text', max: 64, searchKey: 'firstName', sortable: true, rows: 5, url: '/', searchable: true, width: 30, updatable: true, showInTable: true },
        { responseKey: '', translateKey: '', data: '', formClass: '', type: 'text', required: true, tableValue: 'lastName', itemText: '', acceptedFiles: '', autoSelect: false, showInForm: true, min: 1, now: false, disabled: false, text: 'lastName', value: 'lastName', formType: 'text', max: 18, searchKey: 'lastName', sortable: true, rows: 5, url: '/', searchable: true, width: 30, updatable: true, showInTable: true },
        { responseKey: '', translateKey: '', data: '', formClass: '', type: 'object', required: true, tableValue: 'city.name', itemText: 'name', acceptedFiles: '', autoSelect: false, showInForm: true, min: 1, now: false, disabled: false, text: 'city', value: 'city', formType: 'combobox', max: 25, searchKey: 'city.name', sortable: true, rows: 5, url: 'city', searchable: true, width: 20, updatable: true, showInTable: true, filterBy: '' },
        { responseKey: '', translateKey: '', data: '', formClass: '', type: 'boolean', required: true, tableValue: 'isActive', itemText: '', acceptedFiles: '', autoSelect: false, showInForm: true, min: 1, now: false, disabled: false, text: 'isActive', value: 'isActive', formType: 'checkbox', max: 25, searchKey: 'isActive', sortable: true, rows: 5, url: '/', searchable: false, width: 15, updatable: true, showInTable: true },
        { responseKey: '', translateKey: '', data: '', formClass: '', type: 'boolean', required: true, tableValue: 'codeUpdatable', itemText: '', acceptedFiles: '', autoSelect: false, showInForm: false, min: 1, now: false, disabled: false, text: 'codeUpdatable', value: 'codeUpdatable', formType: 'checkbox', max: 25, searchKey: 'codeUpdatable', sortable: false, rows: 5, url: '/', searchable: false, width: 20, updatable: true, showInTable: false }]
})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    nameSurname: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @Column()
    firstName: string

    @Column()
    lastName: string

    @ManyToOne(() => City, { nullable: true, eager: true })
    city: City

    @Column({ default: true })
    isActive: boolean

    @AfterLoad()
    afterLoad(): any {
        this.nameSurname = this.firstName + ' ' + this.lastName
    }
}
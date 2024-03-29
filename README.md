# Hentity is a headless CMS

#### Hentity is a headless CMS help you design APIs fast, manage content easily.

##### Entity Builder

<p align="center">
  <a href="https://youtu.be/A7eVAIDYoYc">Demo video</a>
</p>



<p align="center">
  <img src="https://raw.githubusercontent.com/phanquanghieu/storage/master/hentity/hentity_entity_builder.png" alt="Entity Builder" />
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/phanquanghieu/storage/master/hentity/hentity_entity_builder_2.png" alt="Entity Builder" />
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/phanquanghieu/storage/master/hentity/hentity_entity_builder_3.png" alt="Entity Builder" />
</p>

##### Entity Manager

<p align="center">
  <img src="https://raw.githubusercontent.com/phanquanghieu/storage/master/hentity/hentity_entity_manager.png" alt="Entity Manager" />
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/phanquanghieu/storage/master/hentity/hentity_entity_manager_2.png" alt="Entity Manager" />
</p>

### Feature:

- Entity Builder

- Entity Manager

- Media Manager

- Role & Permission

- Customize APIs

### Installation

1. Install hentity package

   Use command

   ```bash
   yarn add hentity
   ```

2. Init hentity project folder

   Use command

   ```bash
   hentity init
   ```

3. Configuration configs

   Configs are in `.env` file

4. Run project

   Hentity provide two mode (production and develop) to run project

   - In develop mode you can design entity using Entity Builder

     Use command

     ```bash
     hentity develop
     ```

     or

     ```bash
     npm run develop
     ```

   - Production mode is optimize and you cann't design entity

     Use command

     ```bash
     hentity start
     ```

     or

     ```bash
     npm start
     ```

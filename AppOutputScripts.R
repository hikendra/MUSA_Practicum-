library(sf)
library(tidyverse)


# Reading the opa data
opa_dat <- read_csv("../Data/OpenDataPhilly-opa_properties_public.csv")

# Creating geometry for the properties
opa_dat <- opa_dat%>%
  drop_na(lat, lng)%>%
  st_as_sf(coords = c("lat", "lng"),
           crs = "EPSG:4326")

# Reducing columns
opa_ps <- opa_dat[!duplicated(opa_dat$location),] %>%
  dplyr::select(location, category_code, category_code_description, building_code, building_code_description, total_area, total_livable_area, market_value, mailing_street, number_of_bedrooms, number_of_bathrooms, number_stories, year_built, quality_grade)%>%
  filter(category_code == 1 | category_code == 2 | category_code == 3)%>%
  mutate(Price_Sqft = ifelse(is.na(total_livable_area) == FALSE & total_livable_area != 0, market_value / total_area, NA),
         quality_grade_mod = case_when(quality_grade == 1 ~ "E",
                                       quality_grade == 2 ~ "D",
                                       quality_grade == 3 ~ "C",
                                       quality_grade == 4 ~ "B",
                                       quality_grade == 5 ~ "A",
                                       quality_grade == 6 ~ "A+", 
                                       TRUE ~ quality_grade,
         ))%>%
  rename(address = location)%>%
  mutate(condo = ifelse(grepl("CONDO", building_code_description) == TRUE, TRUE, FALSE),
         owner_occ = ifelse(condo == FALSE & category_code_description != "MULTI FAMILY",
                            ifelse(address == mailing_street, TRUE, FALSE),
                            NA))%>%
  filter(Price_Sqft < 100000)%>%
  dplyr::select(-quality_grade)

#extract the lat and long, then reduce df to just those fields
opa_ps <- opa_ps %>% extract(geometry, c('lat', 'lon'), '\\((.*), (.*)\\)', convert = TRUE) 

opa_locations <- opa_ps %>%
  dplyr::select(address, lat, lon)

#Read the the csv for the predictions
predictions <- read_csv("D:/MUSA/MUSASpring/M8040_Practicum/MUSA_Practicum-/site/data/vacant_predictions.csv")
glimpse(predictions)

#Add lat long field to the predictions with a left join
predictions_latlon <- predictions %>%
  left_join(opa_locations, by="address")
glimpse(predictions_latlon)

#Export that field
write_csv(predictions_latlon, "D:/MUSA/MUSASpring/M8040_Practicum/MUSA_Practicum-/site/data/vacant_predictions_locations.csv")

### FINAL PREDICTONS GEOJSONS > CSV's ###

predVacant <- st_read("../Data/vacant_predictions.geojson")
predPermit <- st_read("../Data/permit_predictions.geojson")
predtransfer <- st_read("../Data/transfer_predictions.geojson")


predVacant <- predVacant%>%
  rename(spread1_vacant = level_one,
         spread2_vacant = level_two,
         spread3_vacant = level_three,
         spread4_vacant = level_four,
         spread5_vacant = level_five)

predPermit <- predPermit%>%
  rename(spread1_permit = level_one,
         spread2_permit = level_two,
         spread3_permit = level_three,
         spread4_permit = level_four,
         spread5_permit = level_five)

predtransfer <- predtransfer%>%
  rename(spread1_transfer = level_one,
         spread2_transfer = level_two,
         spread3_transfer = level_three,
         spread4_transfer = level_four,
         spread5_transfer = level_five)

predictions_large <- predVacant%>%
  left_join(st_drop_geometry(predPermit), by="address")%>%
  left_join(st_drop_geometry(predtransfer), by="address")%>%
  dplyr::select(-neighborhood.x, -neighborhood.y)%>%
  mutate(coordinates = geometry)%>%
  st_drop_geometry()%>%
  extract(coordinates, c('lat', 'lon'), '\\((.*), (.*)\\)')%>%
  st_as_sf(coords = c("lat", "lon"),
           remove=FALSE,
           crs = "EPSG:4326")

write_csv(predictions_large, "D:/MUSA/MUSASpring/M8040_Practicum/Data/predictions_full.csv")

predictions_large_subset <- sample_n(predictions_large, 100, replace=TRUE)

sample_n()

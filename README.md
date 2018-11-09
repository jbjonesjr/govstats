# govstats
code.gov stats tooling

## 11/09 data pull
### Stars
---------------- stars ----------------------------
| 1 . nasa/openmct                        : 5282  |
| 2 . USArmyResearchLab/Dshell            : 5098  |
| 3 . scipy/scipy                         : 5079  |
| 4 . nasa/NASA-3D-Resources              : 1422  |
| 5 . GSA/data                            : 1353  |
| 6 . GSA/data.gov                        : 1278  |
| 7 . Code-dot-mil/code.mil               : 1229  |
| 8 . openscenegraph/OpenSceneGraph       : 1177  |
| 9 . WhiteHouse/petitions                : 1177  |
| 10. NREL/api-umbrella                   : 1172  |
---------------------------------------------------


### Forks
---------------- forks ----------------------------
| 1 . scipy/scipy                         : 2556  |
| 2 . USArmyResearchLab/Dshell            : 1164  |
| 3 . openscenegraph/OpenSceneGraph       : 720   |
| 4 . nasa/openmct                        : 585   |
| 5 . spack/spack                         : 539   |
| 6 . lammps/lammps                       : 534   |
| 7 . idaholab/moose                      : 460   |
| 8 . WhiteHouse/petitions                : 373   |
| 9 . GSA/data.gov                        : 356   |
| 10. materialsproject/pymatgen           : 309   |
---------------------------------------------------


### Watchers
--------------- watchers --------------------------
| 1 . USArmyResearchLab/Dshell            : 673   |
| 2 . scipy/scipy                         : 312   |
| 3 . GSA/data.gov                        : 251   |
| 4 . nasa/openmct                        : 232   |
| 5 . nasa/NASA-3D-Resources              : 220   |
| 6 . WhiteHouse/petitions                : 214   |
| 7 . openscenegraph/OpenSceneGraph       : 201   |
| 8 . 18F/api-standards                   : 173   |
| 9 . nsacyber/Windows-Secure-Host-Baseline : 172 |
| 10. Code-dot-mil/code.mil               : 169   |
---------------------------------------------------

### Contributors
** NOTE: Contributor** stats are heavily influenced by upstream forks. Should exclude those repositories from the computation
---------------- contributors ---------------------
| 1 . GSA/terraform                       : 1132  |
| 2 . 18F/node-1                          : 803   |
| 3 . scipy/scipy                         : 669   |
| 4 . GSA/packer                          : 625   |
| 5 . 18F/discourse                       : 537   |
| 6 . 18F/jekyll                          : 437   |
| 7 . spack/spack                         : 338   |
| 8 . GSA/sentry                          : 265   |
| 9 . LLNL/zfs                            : 246   |
| 10. cfpb/hubot                          : 227   |
---------------------------------------------------

### Dependents
---------------- dependents -----------------------
undefined
---------------------------------------------------

### Commits
---------------- commits --------------------------
undefined
---------------------------------------------------

### Notes
* Probot is only included as it adds some helpful features to octokit, including bottleneck and a handy graphql query.
  * I could probably wrap this myself, but ... ¯\_(ツ)_/¯
* `utils/github` and `utils/codegov` are abstractions to those SDKs providing additional functionality
* Not all interesting data is currently available in the public GraphQL schema. Hopefully this will be resolved in the future
* Current rate-limiting via bottleneck only supports a time-bound approach, not a computational bound approach
